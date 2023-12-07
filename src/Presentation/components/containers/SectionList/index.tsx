import React from 'react';
import cn from 'classnames';

import useComponent, { SectionItem, SectionListProps } from './useComponent';
import './styles.css';
import LoaderComponent from '../../UI/Placeholders/LoaderComponent/LoaderComponent';

export default function SectionList<T>(props: SectionListProps<T>) {
  const {
    className,
    refreshing,
    sections,
    renderSectionHeader,
    renderSectionFooter,
    renderItem,
  } = props;
  const {
    refs: { listContentRef },
    handlers: { scrollHandler },
  } = useComponent(props);

  const renderSection = (section: SectionItem<T>) => (
    <div className="section" key={section.title}>
      {renderSectionHeader && renderSectionHeader(section)}
      {Object.entries(section.data).map(renderItem)}
      {renderSectionFooter && renderSectionFooter(section)}
    </div>
  );

  return (
    <div className={cn('section-list', className)}>
      {refreshing && (
        <div className="section-list-loader">
          <LoaderComponent
            width="44"
            height="44"
            color="var(--color-background-info)"
          />
        </div>
      )}
      <div
        className="list-content"
        onScroll={scrollHandler}
        ref={listContentRef}
      >
        {sections.length > 0 && sections.map(renderSection)}
      </div>
    </div>
  );
}
