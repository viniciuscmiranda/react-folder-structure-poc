// react-router-dom useNavigate
import { paths } from "@/routes";

type NavigateFunctionOptions = {
  replace?: boolean;
};

type PathGetter = (p: typeof paths) => string;

type NavigateFunction = (
  getter: PathGetter,
  options?: NavigateFunctionOptions
) => void;

export function useNavigate() {
  const navigateFunction: NavigateFunction = (getter, options) => getter(paths);

  return navigateFunction;
}
