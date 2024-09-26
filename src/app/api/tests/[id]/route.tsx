import { useRouter } from 'next/router';

const TestPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Test {id}</h1>
      {/* Render test details and functionality to attempt the test */}
    </div>
  );
};

export default TestPage;
