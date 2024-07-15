
import axios from "axios";
const VERSION = "v1"
const URL = ` https://ontmzy9lwe.execute-api.us-east-1.amazonaws.com/dev/${VERSION}/`

export async function operation(operation, left, right) {
        try {
            const response = await axios.post(URL + "add", {
            left: left,
            right: right,
            });
            //TODO: see credits
            return { result: response.data.result, credit: 1};
        } catch (err) {
            //setError('An error occurred');
            console.error(err);
        }
}