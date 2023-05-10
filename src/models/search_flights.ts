// To parse this data:
//
//   import { Convert, SearchFlight } from "./file";
//
//   const searchFlight = Convert.toSearchFlight(json);

export interface SearchFlight {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: Date;
    lastTicketingDateTime: Date;
    numberOfBookableSeats: number;
    itineraries: Itinerary[];
    price: SearchFlightPrice;
    pricingOptions: PricingOptions;
    validatingAirlineCodes: string[];
    travelerPricings: TravelerPricing[];
}

export interface Itinerary {
    duration: string;
    segments: Segment[];
}

export interface Segment {
    departure: Arrival;
    arrival: Arrival;
    carrierCode: string;
    number: string;
    aircraft: Aircraft;
    operating: Operating;
    duration: string;
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
}

export interface Aircraft {
    code: string;
}

export interface Arrival {
    iataCode: string;
    terminal?: string;
    at: Date;
}

export interface Operating {
    carrierCode: string;
}

export interface SearchFlightPrice {
    currency: string;
    total: string;
    base: string;
    fees: Fee[];
    grandTotal: string;
}

export interface Fee {
    amount: string;
    type: string;
}

export interface PricingOptions {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: TravelerPricingPrice;
    fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FareDetailsBySegment {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    class: string;
    includedCheckedBags: IncludedCheckedBags;
}

export interface IncludedCheckedBags {
    weight: number;
    weightUnit: string;
}

export interface TravelerPricingPrice {
    currency: string;
    total: string;
    base: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSearchFlight(json: string): SearchFlight {
        return JSON.parse(json);
    }

    public static searchFlightToJson(value: SearchFlight): string {
        return JSON.stringify(value);
    }
}
