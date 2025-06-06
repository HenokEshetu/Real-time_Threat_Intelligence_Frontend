import React from 'react';
import { useParams } from 'react-router-dom';
import { useCourseOfActionDetail } from '@/hooks/useCourseOfAction';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import CourseOfActionDetail from '@/components/common/CourseOfActions/CourseOfActionDetail';
import CourseOfActionRelationships from '@/components/common/CourseOfActions/CourseOfActionRelationship';
import { TabsType, TopTab } from '@/components/common/TopTab';

export const CourseOfActionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { courseOfAction, loading, error } = useCourseOfActionDetail(id);

  const tabs = {
    titles: [
      'Detail',
      'Relationships',
      'Analysis',
      'Content',
    ],
    components: [
      <CourseOfActionDetail />,
      <CourseOfActionRelationships courseOfActionId={id} />,
      <div>Analysis content here</div>,
      <div>Content content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!courseOfAction) return <ErrorMessage message="Course of Action not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {courseOfAction.name}
        </h1>
      </TopContainer>
      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};

export default CourseOfActionDetailPage;
