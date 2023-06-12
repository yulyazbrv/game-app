import "./style.css";
import { Flex } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const HeaderContent = () => {
  const { pathname } = useLocation();

  return (
    <Flex align={"center"} mih={50} justify={"center"}>
      <Flex gap={60}>
        <Link
          to="/create"
          className={classNames("link", pathname === "/create" && "active")}
        >
          CREATE
        </Link>
        <Link
          to="/join"
          className={classNames("link", pathname === "/join" && "active")}
        >
          JOIN
        </Link>
      </Flex>
    </Flex>
  );
};

export { HeaderContent };
