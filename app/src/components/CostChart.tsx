import { ResponsiveLine, Serie } from '@nivo/line';
import { useMemo } from 'react';

interface IProps {
    data: Serie[];
}

const formatter = Intl.NumberFormat('en', { notation: 'standard' });

/**
 * Generates a a series of ticks that are logarithmically spaced between the
 * start and end values provided. Those values are then rounded down to the nearest
 * power of ten.
 */
function generateLogSpace(start: number, end: number, ticks: number) {
    const factor = Math.pow(end / start, 1 / ticks);
    let result = [];
    let value = start;

    for (let i = 0; i <= ticks; i++) {
        result.push(Math.pow(10, Math.floor(Math.log10(value))) * 10);
        value *= factor;
    }

    return result;
}

export const CostChart = ({ data }: IProps) => {
    // We have to generate a y scale that handles huge discrepencies between values
    // We generate a logarithmic range between the min and max values of our costs
    const minValue = data[0].data.reduce(
        (minValue, currObj) => Math.min(minValue, currObj.y as number),
        data[0].data[0].y as number
    );
    const maxValue = data[0].data.reduce(
        (minValue, currObj) => Math.max(minValue, currObj.y as number),
        minValue
    );
    const yScale = useMemo(
        () => generateLogSpace(minValue, maxValue, data[0].data.length),
        [minValue, maxValue, data]
    );

    return (
        <div style={{ height: 500 }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 110 }}
                xScale={{ type: 'point' }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Film',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                yFormat={(v) =>
                    `${formatter.format(v.valueOf() as number)} credits`
                }
                yScale={{
                    type: 'log',
                    base: 10,
                    max: maxValue,
                    min: minValue
                }}
                gridYValues={yScale}
                axisLeft={{
                    tickValues: yScale,
                    tickSize: 1,
                    tickPadding: 5,
                    tickRotation: 30,
                    legend: 'Credits',
                    legendOffset: 10,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};
