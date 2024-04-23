import axios from "axios";
import * as crypto from "crypto";

const NETWORK_API_URLS = {
  ETH: "https://eth-pokt.nodies.app",
  BSC: "https://bsc-pokt.nodies.app",
};

const API_URL = process.env.API_URL || "";
const API_KEY = process.env.API_KEY || "";
const API_SECRET = process.env.API_SECRET || "";

export default class TradingService {
  static async getTokenPrice(symbol: string, network: string) {
    try {
      const apiUrl = NETWORK_API_URLS[network as keyof typeof NETWORK_API_URLS];
      const response = await axios.post(`${API_URL}`, {
        jsonrpc: "2.0",
        method: "eth_getPrice",
        params: [symbol],
        id: 1,
      });

      const data = response.data.result;
      return parseFloat(data);
    } catch (error) {
      console.error("Error fetching token price:", error);
      return null;
    }
  }

  // Function to place a buy order on
  static async placeBuyOrder(symbol: string, quantity: number) {
    try {
      const params = {
        symbol: symbol.toUpperCase() + "USDT",
        side: "BUY",
        type: "MARKET",
        quantity: quantity.toString(),
        timestamp: Date.now(),
        recvWindow: 5000,
      };

      const signature = TradingService.generateSignature(params, API_SECRET);

      const response = await axios.post(`${API_URL}/order`, null, {
        params: {
          ...params,
          signature,
          apikey: API_KEY,
        },
        headers: {
          "X-MBX-APIKEY": API_KEY,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error placing buy order:", error.response.data);
      throw error;
    }
  }

  //  Function to place a sell order on
  static async placeSellOrder(symbol: string, quantity: number) {
    try {
      const params = {
        symbol: symbol.toUpperCase() + "USDT",
        side: "SELL",
        type: "MARKET",
        quantity: quantity.toString(),
        timestamp: Date.now(),
        recvWindow: 5000,
      };

      const signature = await TradingService.generateSignature(
        params,
        API_SECRET
      );

      const response = await axios.post(`${API_URL}/order`, null, {
        params: {
          ...params,
          signature,
          apikey: API_KEY,
        },
        headers: {
          "X-MBX-APIKEY": API_KEY,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error placing sell order:", error.response.data);
      throw error;
    }
  }

  static generateSignature(params: any, secretKey: string) {
    const query = Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(query)
      .digest("hex");
    return signature;
  }

  static async getSummary(symbol: string) {
    try {
      const params = {
        symbol: symbol.toUpperCase() + "USDT",
      };

      const response = await axios.get(`${API_URL}/ticker/24hr`, {
        params: {
          ...params,
          apikey: API_KEY,
        },
        headers: {
          "X-MBX-APIKEY": API_KEY,
        },
      });

      const data = response.data;

      const summary = {
        symbol: data.symbol,
        lastPrice: data.lastPrice,
        change: data.priceChangePercent,
        high: data.highPrice,
        low: data.lowPrice,
        volume: data.volume,
      };

      return summary;
    } catch (error: any) {
      console.error("Error fetching summary:", error.response.data);
      throw error;
    }
  }
}
