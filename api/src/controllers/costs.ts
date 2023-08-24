import { Request, Response } from 'express';
import { Swapi } from '../swapi';
import { groupStarshipsByFilm } from '../utils';

export type CostAggregate = { x: string; y: number };

const swapi = new Swapi();

export const getAggregateCosts = async (req: Request, res: Response) => {
    try {
        const starships = await swapi.getAllStarships();
        const films = await swapi.getAllFilms();
        const groupedByFilm = groupStarshipsByFilm(starships, films);

        const data: { title: string; totalCost: number }[] = [];
        for (const { title, starships } of groupedByFilm) {
            // NOTE: Some starships do not have a known cost. We do not include them in our total
            const totalCost = starships.reduce((acc, s) => {
                const cost =
                    s.cost_in_credits !== 'unknown'
                        ? parseInt(s.cost_in_credits)
                        : 0;
                return acc + cost;
            }, 0);
            data.push({ title, totalCost });
        }

        return res
            .status(200)
            .json(data.map((d) => ({ x: d.title, y: d.totalCost })));
    } catch (error) {
        console.error(`There was an error fetching/processing data from SWAPI`);
        return res.status(500).json({ error: 'intermittent SWAPI error ' });
    }
};
