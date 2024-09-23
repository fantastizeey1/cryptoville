import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/crypptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { Row, Col, Select, Card, Avatar, Typography } from "antd";
import Loader from "./Loader";
import moment from "moment";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
  });

  if (isFetching) return <Loader />;

  // Limit the number of news articles if simplified is true
  const newsToDisplay = simplified
    ? cryptoNews?.data?.slice(0, 6)
    : cryptoNews?.data;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => (
              <Option key={currency.id} value={currency.name}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {newsToDisplay?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <img
                  src={news.thumbnail || demoImage}
                  alt={news.title}
                  className="news-img"
                />
                <Title className="news-title" level={5}>
                  {news.title}
                </Title>
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider && news.provider.length > 0
                        ? news.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        : demoImage
                    }
                    alt=""
                  />
                  <Text className="provider-name">
                    {news.provider && news.provider.length > 0
                      ? news.provider[0]?.name
                      : "Unknown"}
                  </Text>
                </div>
                <Text>{moment(news.createdAt).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
