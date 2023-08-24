import _axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-interceptor';

export type PagedDataResult<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

export type Film = {
    characters: string[];
    created: Date;
    director: string;
    edited: Date;
    episode_id: number;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: Date;
    species: string[];
    starships: string[];
    title: string;
    url: string;
    vehicles: string[];
};

export type Starship = {
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: Date;
    crew: string;
    edited: Date;
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    films: string[];
    pilots: any[];
    starship_class: string;
    url: string;
};

export class Swapi {
    private axios: AxiosInstance;
    private baseUrl = 'https://swapi.dev/api';
    private pageMax = 10;

    constructor() {
        this.axios = _axios.create({
            baseURL: this.baseUrl
        });
        setupCache(this.axios);
    }

    /**
     * Fetches all paged data from a SWAPI endpoint. Will not make more than pageMax requests.
     * @param fetcher function that fetches a page of data
     * @param initialUrl the initial url to begin fetching pages from
     * @returns the accumulated page data
     */
    private getAllPages = async <T>(
        fetcher: (url: string) => Promise<PagedDataResult<T>>,
        initialUrl: string
    ) => {
        const acc: T[] = [];
        let page = await fetcher(initialUrl);
        acc.push(...page.results);

        let pageCount = 0;
        while (page.next !== null && pageCount < this.pageMax) {
            page = await fetcher(page.next);
            acc.push(...page.results);
            pageCount += 1;
        }

        return acc;
    };

    public getAllStarships = async (): Promise<Starship[]> => {
        const fetcher = async (url: string) => {
            const { data } = await this.axios.get<PagedDataResult<Starship>>(
                url
            );
            return data;
        };
        return this.getAllPages(fetcher, `${this.baseUrl}/starships`);
    };

    public getStarshipById = async (id: string): Promise<Starship> => {
        const { data } = await this.axios.get<Starship>(`/starships/${id}`);
        return data;
    };

    public getAllFilms = async (): Promise<Film[]> => {
        const fetcher = async (url: string) => {
            const { data } = await this.axios.get<PagedDataResult<Film>>(url);
            return data;
        };
        return this.getAllPages(fetcher, `${this.baseUrl}/films`);
    };
}
