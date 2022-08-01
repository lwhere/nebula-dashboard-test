import React, { useState, useMemo, forwardRef } from 'react';

import PropTypes from 'prop-types';

import classnames from 'classnames';

import { deepMerge } from '@jiaminghi/charts/lib/util/index';
import { deepClone } from '@jiaminghi/c-render/lib/plugin/util';

import { useAutoResize } from '@jiaminghi/data-view-react';

import { uuid } from '@/utils';

import './index.less';

const defaultColor = ['#11eefd', '#0078d2'];

const BorderBox = forwardRef(
  (
    {
      children,
      className,
      style,
      color = [],
      backgroundColor = 'transparent',
    }: any,
    ref,
  ) => {
    const { width, height, domRef } = useAutoResize(ref);

    const [{ gradientId, maskId }] = useState(() => {
      const id = uuid();

      return {
        gradientId: `border-box-9-gradient-${id}`,
        maskId: `border-box-9-mask-${id}`,
      };
    });

    const mergedColor = useMemo(
      () => deepMerge(deepClone(defaultColor, true), color || []),
      [color],
    );

    const classNames = useMemo(
      () => classnames('dv-border-box-9', className),
      [className],
    );

    return (
      <div className={classNames} style={style} ref={domRef}>
        <svg className="dv-border-svg-container" width={width} height={height}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <animate
                attributeName="x1"
                values="0%;100%;0%"
                dur="10s"
                begin="0s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="100%;0%;100%"
                dur="10s"
                begin="0s"
                repeatCount="indefinite"
              />
              <stop offset="0%" stopColor={mergedColor[0]}>
                <animate
                  attributeName="stop-color"
                  values={`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`}
                  dur="10s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor={mergedColor[1]}>
                <animate
                  attributeName="stop-color"
                  values={`${mergedColor[1]};${mergedColor[0]};${mergedColor[1]}`}
                  dur="10s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <g>
            <polyline
              stroke={mergedColor[0]}
              strokeWidth="3"
              fill="transparent"
              points={`8, ${height * 0.4} 8, 3, ${width * 0.4 + 7}, 3`}
            />
            <polyline
              fill={mergedColor[1]}
              points={`8, ${height * 0.15} 8, 3, ${width * 0.1 + 7}, 3
                ${width * 0.1}, 8 14, 8 14, ${height * 0.15 - 7}
              `}
            />

            <polyline
              stroke={mergedColor[0]}
              strokeWidth="3"
              fill="transparent"
              points={`${width * 0.5}, 3 ${width - 3}, 3, ${width - 3}, ${
                height * 0.25
              }`}
            />
            <polyline
              stroke={mergedColor[1]}
              points={`
                ${width * 0.52}, 3 ${width * 0.58}, 3
                ${width * 0.58 - 7}, 9 ${width * 0.52 + 7}, 9
              `}
            />
            <polyline
              stroke={mergedColor[0]}
              points={`
                ${width * 0.9}, 3 ${width - 3}, 3 ${width - 3}, ${height * 0.1}
                ${width - 9}, ${height * 0.1 - 7} ${width - 9}, 9 ${
                width * 0.9 + 7
              }, 9
              `}
            />

            <polyline
              stroke={mergedColor[1]}
              strokeWidth="3"
              fill="transparent"
              points={`8, ${height * 0.5} 8, ${height - 3} ${
                width * 0.3 + 7
              }, ${height - 3}`}
            />
            <polyline
              stroke={mergedColor[0]}
              points={`
                8, ${height * 0.55} 8, ${height * 0.7}
                2, ${height * 0.7 - 7} 2, ${height * 0.55 + 7}
              `}
            />

            <polyline
              stroke={mergedColor[1]}
              strokeWidth="3"
              fill="transparent"
              points={`${width * 0.35}, ${height - 3} ${width - 3}, ${
                height - 3
              } ${width - 3}, ${height * 0.35}`}
            />
            <polyline
              stroke={mergedColor[0]}
              points={`
                ${width * 0.92}, ${height - 3} ${width - 3}, ${height - 3} ${
                width - 3
              }, ${height * 0.8}
                ${width - 9}, ${height * 0.8 + 7} ${width - 9}, ${height - 9} ${
                width * 0.92 + 7
              }, ${height - 9}
              `}
            />
          </g>
        </svg>

        <div className="border-box-content">{children}</div>
      </div>
    );
  },
);

BorderBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array,
  backgroundColor: PropTypes.string,
};

export default BorderBox;
