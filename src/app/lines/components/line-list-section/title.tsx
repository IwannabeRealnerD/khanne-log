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
    <div className="flex flex-col gap-2 border-t border-edge bg-bg-subtle px-4 py-4">
      {isTitleTooLong ? (
        <button
          aria-expanded={isOpen}
          className="-m-2 cursor-pointer rounded-md p-2 text-left transition-[background-color,transform] duration-150 ease-out hover:bg-bg-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none"
          type="button"
          onClick={toggleOpen}
        >
          <p
            className={globalCn(
              "text-base leading-relaxed font-medium text-fg md:text-xl md:leading-7",
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
            "text-base leading-relaxed font-medium text-fg md:text-xl md:leading-7",
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
