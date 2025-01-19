import React, { useState } from "react";
import styles from "../../styles/accordion.module.scss";
import { AccordionProps } from "../../Utilities/types";

// keep the comment inside the Accordion component to make UI flexible
// and to make the component reusable in other parts of the application
const Accordion: React.FC<AccordionProps> = ({
  children,
  commentCount,
  postIndex,
}) => {
  // by default, all the accordions are open by set postIndex to activeIndex
  const [activeIndex, setActiveIndex] = useState(postIndex);

  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionItem}>
        <button
          className={styles.accordionHeader}
          onClick={() => toggleAccordion(postIndex)}
          aria-expanded={activeIndex === postIndex}
        >
          Comments: {commentCount}
          {/* arrow indicate */}
          <span
            className={`${
              activeIndex === postIndex ? styles.arrowUp : styles.arrowDown
            } ${styles.arrow}`}
          >
            &#9660;
          </span>
        </button>
        <div
          className={`${styles.accordionContent} ${
            activeIndex === postIndex ? styles.active : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
