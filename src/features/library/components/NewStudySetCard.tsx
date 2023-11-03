import IconNew from "../assets/add_FILL0_wght400_GRAD0_opsz40.svg";

export const CreateNewStudySetCard = () => {
  return (
    <article className="font-medium text-theme-brown-light p-3 rounded-xl bg-theme-background-light-variant">
      <div className="flex items-center gap-2.5">
        <div className="w-20 h-20 rounded-xl flex items-center justify-center text-theme-lime-light border-[3px] border-theme-lime-light border-dashed">
          <span
            className="block w-10 h-10 bg-current"
            style={{
              WebkitMask: `url(${IconNew}) center center no-repeat`,
              mask: `url(${IconNew}) center center no-repeat`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </div>
        <p className="text-xl">Create new…</p>
      </div>
    </article>
  );
};
