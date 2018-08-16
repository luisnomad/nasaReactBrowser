import React from 'react';

const SectionHeader = ({ children, className = '' }) => (
  <section className={`jumbotron text-center rounded-0 ${className}`}>
    <div className="container">{children}</div>
  </section>
);

export default SectionHeader;
