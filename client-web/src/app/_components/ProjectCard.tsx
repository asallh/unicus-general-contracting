interface ProjectCardProps {
  ProjectTitle: string;
}

export default function ProjectCard({ ProjectTitle }: ProjectCardProps) {
  return <div>{ProjectTitle}</div>;
}
