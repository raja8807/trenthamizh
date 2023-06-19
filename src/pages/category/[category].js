import ArticleList from "@/components/articles/article-list/article-list";
import Layout from "@/components/layout/layout";
import PageHeading from "@/components/ui/page-heading/page_heading";
import axios from "axios";
import { useEffect, useState } from "react";

const CategoryScreen = (props) => {
  const { articlesData, categoryName } = props;

  const [articles, setArticles] = useState([]);
  const heading = `${categoryName[0].toUpperCase()}${categoryName.slice(1)}`;

  const tags = articles
    ?.slice(0, 10)
    .map((article) => article.tags)
    ?.flat(1)
    .slice(0, 10);

  useEffect(() => {
    setArticles(articlesData);
  }, [articlesData]);

  return (
    articles[0] && (
      <Layout categoryName={categoryName} tags={tags}>
        <PageHeading heading={heading} />
        <ArticleList articles={articles} />
      </Layout>
    )
  );
};

export default CategoryScreen;

export async function getServerSideProps(context) {
  const categoryName = context.query.category;
  const fetchUrl = `http://${context.req.headers.host}/api/articles?category=${categoryName}`;

  const res = await axios.get(fetchUrl);

  return {
    props: {
      articlesData: res.data,
      categoryName,
    },
  };
}
