"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";

import { globalCn } from "@/utils/globalCn";
import { globalGetLocalStorage, globalSetLocalStorage } from "@/utils/globalLocalStorage";

interface InternalMainTitleProps {
  title: string;
  isDescription?: boolean;
  id: string;
}

const MAX_TITLE_LENGTH = 80;

export const InternalMainTitle: FunctionComponent<InternalMainTitleProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const isInitialRender = useRef(true);

  const isTitleTooLong = props.title.length > MAX_TITLE_LENGTH;

  useEffect(() => {
    const openedLineList = globalGetLocalStorage("openedLineList");
    if (openedLineList?.includes(props.id)) {
      setIsOpen(true);
    }
  }, [props.id]);

  if (isInitialRender.current && isTitleTooLong) {
    setIsOpen(false);
    isInitialRender.current = false;
    return;
  }

  if (isTitleTooLong) {
    return (
      <button
        className="mb-4 cursor-pointer text-left"
        onClick={() => {
          const openedLineList = globalGetLocalStorage("openedLineList");
          const updatedOpenedLineList = (() => {
            if (isOpen) {
              return openedLineList?.filter((id) => id !== props.id) ?? [];
            }
            return [...(openedLineList?.filter((id) => id !== props.id) ?? []), props.id];
          })();
          globalSetLocalStorage("openedLineList", updatedOpenedLineList);
          setIsOpen(!isOpen);
        }}
      >
        <h3 className={globalCn("text-xl font-bold", props.isDescription && "text-gray-600")}>
          {isOpen ? props.title : props.title.slice(0, MAX_TITLE_LENGTH) + "..."}
        </h3>
        <p className="text-right text-sm text-gray-500">{isOpen ? "Show less" : "Show more"}</p>
      </button>
    );
  }
  return (
    <div className="flex gap-2">
      <h3 className={globalCn("mb-4 text-xl font-bold", props.isDescription && "text-gray-600")}>{props.title}</h3>
    </div>
  );
};
