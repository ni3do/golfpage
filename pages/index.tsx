import Layout from "../components/Layout";
import Leaderboard from "../components/Leaderboard";
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
    <Layout pageTitle="Leaderboard">
      <Leaderboard />
    </Layout>
  );
}
