"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";

import { globalCn } from "@/utils/global-cn";
import { globalGetLocalStorage, globalSetLocalStorage } from "@/utils/global-local-storage";

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

  const toggleOpen = () => {
    const openedLineList = globalGetLocalStorage("openedLineList");
    const updatedOpenedLineList = (() => {
      if (isOpen) {
        return openedLineList?.filter((id) => id !== props.id) ?? [];
      }
      return [...(openedLineList?.filter((id) => id !== props.id) ?? []), props.id];
    })();
    globalSetLocalStorage("openedLineList", updatedOpenedLineList);
    setIsOpen(!isOpen);
  };

  const quoteText = isTitleTooLong && !isOpen ? mainTitle.slice(0, MAX_TITLE_LENGTH) + "..." : mainTitle;

  return (
    <div className="flex flex-col gap-2 border-t border-border bg-bg-subtle px-4 py-4">
      {isTitleTooLong ? (
        <button className="cursor-pointer text-left" onClick={toggleOpen}>
          <p
            className={globalCn(
              "text-base leading-relaxed font-medium text-fg md:text-h3 md:leading-h3",
              isDescription && "text-muted italic"
            )}
          >
            {quoteText}
          </p>
          <p className="mt-1 text-caption text-accent">{isOpen ? "접기" : "더 보기"}</p>
        </button>
      ) : (
        <p
          className={globalCn(
            "text-base leading-relaxed font-medium text-fg md:text-h3 md:leading-h3",
            isDescription && "text-muted italic"
          )}
        >
          {mainTitle}
        </p>
      )}
      {props.scene_description && props.quote && <p className="text-body text-muted">{props.scene_description}</p>}
    </div>
  );
};
