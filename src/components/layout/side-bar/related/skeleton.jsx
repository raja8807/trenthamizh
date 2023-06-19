const {
  default: ThumbCard,
} = require("@/components/ui/cards/thumb-card/thumb_card");

const RelatedSkeleton = (props) => {
  const { count } = props;

  return [...Array(count).keys()].map((_, i) => (
    <ThumbCard key={i} isLoading />
  ));
};

export default RelatedSkeleton;
