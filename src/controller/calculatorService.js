
import axios from "axios";
import { getUser } from "./authService";
import { HOST_URL } from "../config/constants";

const VERSION = "v1"
const URL = `${HOST_URL}/dev/${VERSION}/`

const precisionFactor = 1000000; // 6 digits

function toIntWithPrecision(aParam) {
    const multiplied = parseFloat(aParam) * precisionFactor;
    const integerRepresentation = Math.round(multiplied); 
    return String(integerRepresentation);
}

function toStrWithoutPrecision(aParam) {
    const withoutPrecision = aParam / precisionFactor;
    let formattedNumber = withoutPrecision.toFixed(2);

    return String(formattedNumber);
}

export async function operation(operation, left, right) {
    try {
        const user = getUser();
        const response = await axios.post(URL + operation, {
            left: toIntWithPrecision(left),
            right: toIntWithPrecision(right),
            'App-Username': user.username,
            'App-Session': user.session, 
        });
        return { result: toStrWithoutPrecision(response.data.result), credit: response.data.credit };
    } catch (err) {
        // Handle error
        console.error(err);
    }
}