import React, { useEffect, useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api'

import {KEY} from "./api";
import {StyledGifGallery} from "./styles";

const jif = new GiphyFetch(KEY)

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const Playing = ({onDone}) => {
    const [trendingGifs, setTrendingGifs] = useState([]);
    const [randomGifs, setRandomGifs] = useState([]);
    const [allGifs, setAllGifs] = useState([]);
    const [hasTallyed, setHasTallyed] = useState(false);

    useEffect(() => {
        if (trendingGifs.length && randomGifs.length) {
            setAllGifs(
                shuffle(
                    [ ...trendingGifs, ...randomGifs]
                )
            )
        }
    }, [trendingGifs, randomGifs])

    useEffect(() => {
        jif.trending({ offset: 0, limit: 5 }).then(({data}) => {
            setTrendingGifs(data.map(gif => {
                return { ...gif, __isTrending: true};
            }));
        });
        let random = new Array(5).fill(0);;
        Promise.all(random.map(() => {
            return jif.random().then(res => res.data);
        })).then(gifs => {
            setRandomGifs(gifs.map(gif => {
                return { ...gif, __isTrending: false};
            }));
        })

    }, [])

    const selectedCount = allGifs.filter(g => g.selected).length;

    const trendingCount = allGifs.filter(g => g.selected).filter(g => g.__isTrending).length;


    return (
        <StyledGifGallery>
            <div className="controls">
                <h2>Select 5 trending gifs to win</h2>
                <h2>SELECTED: {selectedCount}</h2>
                {
                    hasTallyed &&
                        <button onClick={onDone}>
                            RESET
                        </button>
                }
                {
                    !hasTallyed &&
                    <button
                        onClick={() => setHasTallyed(true)}
                    >
                        TALLY
                    </button>
                }

            </div>
            {
                hasTallyed &&
                <div>
                    TRENDING: {trendingCount} / 10
                </div>
            }
            {
                !hasTallyed &&
                <div className="gallery">
                    {
                        allGifs.map((gif, index) => {
                            return (
                                <div
                                    key={gif.id}
                                    onClick={() => {
                                        if (selectedCount === 5) {
                                            return;
                                        }
                                        setAllGifs(allGifs.map(g => {
                                            if (g.id === gif.id) {
                                                g.selected = !g.selected;
                                            }

                                            return g;
                                        }))
                                    }}
                                    className={gif.selected ? 'selected' : ''}
                                >
                                    <img
                                        src={gif.images.downsized.url}
                                        style={{
                                            height: gif.images.downsized.height,
                                            width: gif.images.downsized.width,
                                        }}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            }

        </StyledGifGallery>
    );
};

export default Playing;

