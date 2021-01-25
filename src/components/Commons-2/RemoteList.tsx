import { Box, Button, Center, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

interface Props<T> {
  itemRenderer: (item: T) => JSX.Element;
  query: (offset: number, limit: number) => Promise<T[]>;
  count: () => Promise<number>;
  loadingItem: React.ReactNode;
}
const LoadingRemoteList = <T extends {}>({ loadingItem }: Props<T>) => {
  return (
    <VStack align="stretch" w="100%">
      {loadingItem}
      {loadingItem}
      {loadingItem}
      {loadingItem}
      {loadingItem}
      {loadingItem}
      {loadingItem}
      {loadingItem}
    </VStack>
  );
};
export const RemoteList = <T extends {}>(props: Props<T>) => {
  const [items, setItems] = React.useState<T[]>();
  const [total, setTotal] = React.useState<number>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      const items = await props.query(0, 10);
      const total = await props.count();
      setItems(items);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  }, [props]);
  const loadMore = React.useCallback(() => {
    if (items == null) return;
    props
      .query(items.length, 10)
      .then((newItems) =>
        setItems((items) => (items ? [...items, ...newItems] : items))
      );
  }, [items, props]);
  React.useEffect(() => {
    load();
  }, [load]);
  if (items == null || total == null) return <LoadingRemoteList {...props} />;
  return (
    <VStack align="stretch">
      {items?.map((item, index) => (
        <Box key={index}>{props.itemRenderer(item)}</Box>
      ))}
      <Center>
        {!loading && items.length < total && (
          <Button variant="link" onClick={loadMore}>
            Xem thêm
          </Button>
        )}
        {loading && <Spinner />}
      </Center>
    </VStack>
  );
};
