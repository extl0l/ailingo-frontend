import { PropsWithChildren } from "react";

export interface SectionWrapperProps {
  title: string;
  description?: string;
}

export const SectionWrapper = (
  props: PropsWithChildren<SectionWrapperProps>,
) => {
  return (
    <>
      <header className="col-span-full font-medium text-theme-brown-light mt-2.5 first-of-type:mt-0">
        <h2 className="text-2xl">{props.title}</h2>
        {props.description && (
          <p className="mt-0.5 opacity-75">{props.description}</p>
        )}
      </header>
      {props.children}
    </>
  );
};
