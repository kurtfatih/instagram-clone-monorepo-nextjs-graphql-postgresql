import { NextApiRequest, NextApiResponse } from "next"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { key } = req.query
  if (!key) res.status(400).json({ msg: "Key not not found" })
  // axios({
  //   url: 'https://1jzxrj179.lp.gql.zone/graphql',
  //   method: 'post',
  //   data: {
  //     query: `
  //       query PostsForAuthor {
  //         author(id: 1) {
  //           firstName
  //             posts {
  //               title
  //               votes
  //             }
  //           }
  //         }
  //       `
  //   }
  // }).then((result) => {
  //   console.log(result.data)
  // });

  if (req.method === "POST") {
    return res.status(400).json({ msg: "Method not found" })
  }
}
export default handler
