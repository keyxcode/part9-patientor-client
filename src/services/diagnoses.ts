import axios from "axios";
import { Diagnose } from "../types";

import { apiBaseUrl } from "../constants";

const getDianoses = async () => {
  const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

export default { getDianoses };
