import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		res.send("Hello world");
	} else {
		res.send("Invalid method");
	}
}
