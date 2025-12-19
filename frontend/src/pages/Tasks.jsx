import { useEffect, useState } from "react";
import taskService from "../services/taskService";

const Tasks = ({ onSelectTask }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await taskService.getMyAssignedTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (!tasks.length) return <p>No tasks assigned</p>;

  return (
    <div className="task-list">
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} onSelect={() => onSelectTask(task.id)} />
    ))}
    </div>
  );
};
