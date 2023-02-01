import { FC } from "react";

interface dashboardProps {
  props: string;
}

const dashboard: FC<dashboardProps> = ({ props }) => {
  return <div>Dashboard page.</div>;
};

export default dashboard;
