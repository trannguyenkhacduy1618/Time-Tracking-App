import { useEffect, useState } from "react";
import reportService from "../services/reportService";

const Reports = () => {
  const [daily, setDaily] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const dailyData = await reportService.getDailyReport(date);
        const summary = await reportService.getSummaryStatistics();
        setDaily(dailyData);
        setStats(summary);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [date]);

  if (loading) return <p>Loading reports...</p>;
  if (!daily.length) return <p>No report data for {date}</p>;

  return <ReportTable data={daily} />;
};
