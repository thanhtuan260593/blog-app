import React from "react";
import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import { postRoutes } from "constants/postRoutes";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
interface Props extends ButtonProps {
  tags?: string[];
}
export const NewPostButton = (props: Props) => {
  const history = useHistory();
  const path = React.useMemo(() => {
    return queryString.stringifyUrl({
      url: postRoutes.postCreate.path,
      query: { tags: props.tags },
    });
  }, [props]);

  return (
    <Button
      onClick={() => history.push(path)}
      colorScheme="blue"
      leftIcon={<Icon as={MdAddCircle} />}
      {...props}
    >
      Bài viết mới
    </Button>
  );
};
