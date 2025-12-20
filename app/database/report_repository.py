from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.models import Report

class ReportRepository:
    def get(self, db: Session, report_id: int) -> Optional[Report]:
        return db.query(Report).filter(Report.id == report_id).first()

    def get_by_user(self, db: Session, user_id: int) -> List[Report]:
        return db.query(Report).filter(Report.user_id == user_id).all()

    def get_by_user_and_date(self, db: Session, user_id: int, date: datetime) -> Optional[Report]:
        return db.query(Report).filter(
            Report.user_id == user_id,
            func.date(Report.report_date) == date.date()
        ).first()

    def create(self, db: Session, obj_in: dict) -> Report:
        report = Report(**obj_in)
        db.add(report)
        db.commit()
        db.refresh(report)
        return report

    def update(self, db: Session, db_obj: Report, obj_in: dict) -> Report:
        for field, value in obj_in.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, id: int):
        db.query(Report).filter(Report.id == id).delete()
        db.commit()


report_repository = ReportRepository()
