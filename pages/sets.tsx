import { Provider } from "react-redux";
import Layout from "../components/Layout";
import Sets from "../components/SetPage";
import { setupMaps } from "../store/maps";
import { setupPlayers } from "../store/players";
import { setupSets } from "../store/sets";
import { setupSettings } from "../store/settings";
import { store } from "../store/store";

type Props = {};

export default function IndexPage({}: Props) {
  store.dispatch(setupMaps());
  store.dispatch(setupPlayers());
  store.dispatch(setupSets());
  store.dispatch(setupSettings());
  return (
    <Provider store={store}>
      <Layout pageTitle="Sets">
        <Sets />
      </Layout>
    </Provider>
  );
}
