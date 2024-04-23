import query from ".";

export default async function queryCollection(
  n: number
): Promise<{ isbn_c_p: string; link: string }[]> {
  let offset = 0;
  const limit = 1000;
  const collectionName = `dsd${n}`;
  const responses: Promise<Response>[] = [];
  const res0 = await query({
    collectionName,
    dataQuery: {
      filter: {},
      sort: [{ fieldName: "timeStamp", order: "ASC" }],
      paging: { offset, limit: 1 },
      fields: [],
    },
    options: {},
    includeReferencedItems: [],
    segment: "LIVE",
    appId: "4f9cb406-007a-45ab-a398-b6358eeab675",
  });
  const data = await res0.json();
  const { totalCount } = data;
  while (offset < totalCount) {
    responses.push(
      query({
        collectionName,
        dataQuery: {
          filter: {},
          sort: [{ fieldName: "timeStamp", order: "ASC" }],
          paging: { offset, limit },
          fields: [],
        },
        options: {},
        includeReferencedItems: [],
        segment: "LIVE",
        appId: "4f9cb406-007a-45ab-a398-b6358eeab675",
      })
    );
    offset += limit;
  }
  return (
    await Promise.all(
      (
        await Promise.all(responses)
      ).map(async (res) => {
        const items: { isbn_c_p: string; link: string }[] = (await res.json())
          .items;
        // .map(
        //   ({ isbn_c_p, link }: { isbn_c_p: string; link: string }) => ({
        //     isbn_c_p,
        //     link,
        //   })
        // );
        return items;
      })
    )
  ).flat();
}
