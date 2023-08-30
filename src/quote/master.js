import { List } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Master() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    getMaster();
  }, []);

  async function getMaster() {
    const response = await fetch(`https://api.quotable.io/quotes`).then(
      (response) => response.json()
    );
    setQuotes(response.results);
  }

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={quotes}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`/master/${item._id}`}>{item.content}</Link>}
            />
          </List.Item>
        )}
      />
    </>
  );
}
