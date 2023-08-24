import type { Starship, Film } from './swapi';

export const groupStarshipsByFilm = (starships: Starship[], films: Film[]) => {
    const filmToStarships = new Map<string, Starship[]>();
    const filmIdToFilmTitle = new Map<string, string>();

    for (const starship of starships) {
        for (const film of starship.films) {
            // Map the id to the film title
            if (!filmIdToFilmTitle.has(film)) {
                filmIdToFilmTitle.set(
                    film,
                    films.find((f) => f.url === film)!.title
                );
            }

            // Map the film to the starship
            if (filmToStarships.has(film)) {
                filmToStarships.get(film)!.push(starship);
            } else {
                filmToStarships.set(film, [starship]);
            }
        }
    }

    // We rely on the sort order of the films list to return this ordered by release date
    return films.map((f) => ({
        title: filmIdToFilmTitle.get(f.url) as string,
        starships: filmToStarships.get(f.url) as Starship[]
    }));
};
