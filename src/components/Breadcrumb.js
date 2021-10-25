import * as React from "react";
import { Breadcrumbs } from "baseui/breadcrumbs";
import { StyledLink } from "baseui/link";
import { useHistory } from "react-router-dom";

export const BreadCrumbComponent = (props) => {
  const currentItems = treeTraverse(props.items, props.currentSection);
  const history = useHistory();
  return (
    <Breadcrumbs>
      {currentItems.map((item, index) => (
        <>
          {currentItems.length - 1 === index ? (
            <span>{item.title}</span>
          ) : (
            <StyledLink
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (item.path) {
                  history.push(item.path);
                }
                props.setCurrentSection(item.itemId);
              }}
            >
              {item.title}
            </StyledLink>
          )}
        </>
      ))}
    </Breadcrumbs>
  );
};

const treeTraverse = (items, currentSection) => {
  let result = [{ title: "Your Event", path: "/" }];

  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    if (element.itemId === currentSection) {
      result.push(element);
    } else if (element.subNav) {
      element.subNav.forEach((subItem) => {
        if (subItem.itemId === currentSection) {
          result.push(element);
          result.push(subItem);
        }
      });
    }
  }

  return result;
};
