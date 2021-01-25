import { Icon, IconProps } from "@chakra-ui/icons";
import React from "react";
import { RiArticleLine } from "react-icons/ri";
import { AIIcon } from "../commons/icons/AIIcon";
import { InnovationIcon } from "../commons/icons/InnovationIcon";
import { BsFillPersonFill } from "react-icons/bs";
import {
  AiOutlineAmazon,
  AiOutlineGoogle,
  AiOutlineMedium,
} from "react-icons/ai";
import {
  BiStats,
  BiData,
  BiGame,
  BiHeartCircle,
  BiNetworkChart,
} from "react-icons/bi";
import { GrDocumentPerformance, GrBlog } from "react-icons/gr";
import { MdDeveloperBoard, MdEvent } from "react-icons/md";
import { RiFundsLine } from "react-icons/ri";
import { GiMeat, GiTrade, GiSoccerBall } from "react-icons/gi";
import { FaSuperpowers } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
interface Props extends IconProps {
  tag: string;
  hiddenIfNotFound?: boolean;
}
export const TagIconSet: { [key: string]: any } = {
  medium: AiOutlineMedium,
  artificialintelligence: AIIcon,
  machinelearning: AIIcon,
  deeplearning: AIIcon,
  ethics: BsFillPersonFill,
  innovation: InnovationIcon,
  amazon: AiOutlineAmazon,
  google: AiOutlineGoogle,
  rstats: BiStats,
  datascience: BiData,
  productivity: GrDocumentPerformance,
  softwaredevelopment: MdDeveloperBoard,
  inteligenciaartificial: AIIcon,
  life: BiHeartCircle,
  gaming: BiGame,
  blog: GrBlog,
  networking: BiNetworkChart,
  crowdfunding: RiFundsLine,
  food: GiMeat,
  trading: GiTrade,
  events: MdEvent,
  transhumanism: FaSuperpowers,
  soccer: GiSoccerBall,
  database: BiData,
  businessstrategy: FcBusinessman,
};
const DefaultTagIcon = RiArticleLine;
export const TagIcon = ({ tag, hiddenIfNotFound, ...rest }: Props) => {
  const as = tag in TagIconSet ? TagIconSet[tag] : DefaultTagIcon;
  if (as === DefaultTagIcon && hiddenIfNotFound) return <></>;
  return <Icon {...rest} as={as} />;
};
