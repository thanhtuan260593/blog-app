import React, { useState } from "react";
import { TagManage } from "components/tag/TagManage";
import { AdminPostList } from "components/admin/PostList";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Layout } from "components/layout/Layout";
import { matchPath, useHistory, useLocation } from "react-router-dom";
import { LoadingModal } from "components/commons/LoadingModal";
import { ProtectedComponent } from "components/commons/ProtectComponent";
import { scopes } from "constants/scopes";

const tabs = ["post", "tag"];
export const HomeAdmin = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const location = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    const match = matchPath<{ tab: string }>(location.pathname, "/admin/:tab");
    if (match) {
      const selected = tabs.reduce(
        (result: number | undefined, tab, index) =>
          tab === match.params.tab ? index : result,
        undefined
      );
      setSelectedIndex(selected ?? 0);
      return;
    }
    setSelectedIndex(0);
  }, [location]);
  const handleChange = (index: number) => {
    history.push("/admin/" + tabs[index]);
  };
  if (selectedIndex == null)
    return <LoadingModal isOpen={true} onClose={() => {}} />;
  return (
    <ProtectedComponent scopes={[scopes.admin]}>
      <Layout>
        <Tabs
          isLazy
          index={selectedIndex}
          onChange={handleChange}
          orientation="vertical"
        >
          <TabList>
            <Tab>Post</Tab>
            <Tab>Tags</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AdminPostList />
            </TabPanel>
            <TabPanel>
              <TagManage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </ProtectedComponent>
  );
};
