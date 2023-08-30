import { Button, Divider, Row } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const id = window.location.pathname.split("/")[2];
    const urlToFetch = id
      ? `https://api.quotable.io/quotes/${id}`
      : `https://api.quotable.io/quotes/random`;
    const actualData = await fetch(urlToFetch).then((response) =>
      response.json()
    );

    if (id) {
      setQuote(actualData);
      return;
    }
    setQuote(actualData[0]);
  }

  const RefreshButton = () => {
    const id = window.location.pathname.split("/")[2];
    if (id) {
      return;
    }

    return (
      <Row justify={"center"}>
        <Button type="primary" onClick={() => getData()}>
          Refresh
        </Button>
      </Row>
    );
  };

  return (
    <>
      <p style={{ padding: "20px" }}>{quote.content}</p>
      <Divider orientation="right" plain>
        <i>{quote.author}</i>
      </Divider>
      <RefreshButton />
    </>
  );
}
