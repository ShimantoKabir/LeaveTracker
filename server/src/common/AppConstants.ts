import {ConfigService} from "@nestjs/config";
import {config} from "rxjs";

export default class AppConstants{
  public static GOOGLE_AUTH_SCOPES = "https://www.googleapis.com/auth/spreadsheets";
  // public static SPREAD_SHEET_ID = "1Xn5ecUwxY_kgoTdUlGNeKmSTxOHZ69Kw4Y6du1a_QHA"; // echologyxkabir@gmail.com
  // public static SPREAD_SHEET_ID = "1eTCChqOjlSVmLQSuoLpTgVfjKQNTe0hNaQRQmCJ9--Y"; // shahariar.kabir@brainlabsdigital.com
  public static SPREAD_SHEET_ID = "1AI1niguYPXlD1lhlwYH_B3Hl00qELzAWF6lGZxVBCr0"; // shahariar.kabir@brainlabsdigital.com
  public static SALT_OR_ROUNDS = 10;
  public static JWT_SECRET_KEY = "1Xn5ecUwxY_kgoTdUlGNeKmSTxOHZ69Kw4Y6du1a_QHA";
  public static TENANT_ID = "TENANT_ID";
  public static CLIENT_ID = "CLIENT_ID";
  public static CLIENT_SECRET = "CLIENT_SECRET";
  public static AAD_ENDPOINT = "AAD_ENDPOINT";
  public static GRAPH_ENDPOINT = "GRAPH_ENDPOINT";
}
