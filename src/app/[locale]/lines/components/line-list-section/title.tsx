"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";

import { globalCn } from "@/utils/globalCn";
import { globalGetLocalStorage, globalSetLocalStorage } from "@/utils/globalLocalStorage";

interface TitleProps {
  quote: string | null;
  scene_description: string | null;
  id: string;
}

const MAX_TITLE_LENGTH = 80;

export const Title: FunctionComponent<TitleProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const isInitialRender = useRef(true);

  const mainTitle = !props.quote && props.scene_description ? props.scene_description : (props.quote ?? "");
  const isDescription = !props.quote && !!props.scene_description;
  const isTitleTooLong = mainTitle.length > MAX_TITLE_LENGTH;

  useEffect(() => {
    const openedLineList = globalGetLocalStorage("openedLineList");
    if (openedLineList?.includes(props.id)) {
      setIsOpen(true);
    }
  }, [props.id]);

  if (isInitialRender.current && isTitleTooLong) {
    setIsOpen(false);
    isInitialRender.current = false;
  }

  const renderMainTitle = () => {
    if (isTitleTooLong) {
      return (
        <button
          className="cursor-pointer text-left"
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
          <h3 className={globalCn("text-lg font-bold", isDescription && "text-gray-600")}>
            {isOpen ? mainTitle : mainTitle.slice(0, MAX_TITLE_LENGTH) + "..."}
          </h3>
          <p className="text-right text-xs text-gray-500">{isOpen ? "Show less" : "Show more"}</p>
        </button>
      );
    }
    return (
      <div className="flex gap-2">
        <h3 className={globalCn("text-lg font-bold", isDescription && "text-gray-600")}>{mainTitle}</h3>
      </div>
    );
  };

  return (
    <div className="mb-3 flex flex-col gap-1 border-b border-dashed border-gray-200 pb-2">
      {renderMainTitle()}
      {props.scene_description && props.quote && <p className="text-base">{props.scene_description}</p>}
    </div>
  );
};
