import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Box } from './grid/Box';

interface Props {
  headline?: string;
  subline?: string;

  children: React.ReactNode[];
}

export const Steps = ({ headline, subline, children }: Props) => {
  const [index, setIndex] = useState(0);

  const getPoints = () => {
    let points = [];

    let max = children.length - 1;
    let size = '1of' + children.length;

    for (let i = 0; i <= max; i++) {
      let className = i === index ? 'active' : undefined;

      points.push(
        <Box
          size={size}
          tagName="li"
          className={className}
          key={i}
          onClick={() => setIndex(i)}
        >
          <strong>{i + 1}</strong>
        </Box>,
      );
    }

    let className = 'points pos-' + (index + 1);
    let style = {
      left: (100 / children.length) * (index + 1) - 100 / children.length + '%',
    };

    return (
      <ul className={className}>
        {points}

        <li className="arrow-rail">
          <i style={style} data-box={size} />
        </li>
      </ul>
    );
  };

  return (
    <section className="section steps">
      <h2 className="section-headline">
        <strong>{headline}</strong>
        <small>{subline}</small>
      </h2>

      {getPoints()}

      <SwipeableViews
        index={index}
        className="box-primary-max-round slides"
        onChangeIndex={setIndex}
      >
        {children}
      </SwipeableViews>
    </section>
  );
};
