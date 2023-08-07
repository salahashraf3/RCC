import React, { useEffect, useState } from "react";
import "../css/Schedule.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { request } from "../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Schedule() {
  const [clickedDate, setClickedDate] = useState();
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState();
  const navigate = useNavigate();

  const getData = async () => {
    request({
      url: "/api/user/getUserDataById",
      method: "post",
    })
      .then((data) => {
        if (data.data.success) {
          setEvent(data.data.data.schedules);
        } else if (data.data.success === false) {
          localStorage.clear();
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    request({
      url: "/api/user/addEvent",
      method: "post",
      data: {
        title: e.target.event.value,
        date: clickedDate,
        color: e.target.color.value,
      },
    })
      .then(() => {
        getData();
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  const handleDateClick = (data) => {
    setOpen(true);
    setClickedDate(data.dateStr);
  };

  const deleteEvent = (data) => {
    const eventId = data.event._def.extendedProps._id;
    request({
      url: "/api/user/deleteEvent",
      method: "post",
      data: {
        eventId,
      },
    }).then((data) => {
      getData();
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="schedule-container">
      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="modal-container">
          <form onSubmit={handleSubmit}>
            <h5>Event</h5>
            <input type="text" className="form-control" required name="event" />
            <h5 className="mt-4">Color</h5>
            <input type="color" className="form-control" name="color" />
            <div className=" d-flex justify-content-end mt-4">
              <button className=" btn btn-primary text-right" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={event}
        dateClick={handleDateClick}
        eventClick={deleteEvent}
      />
    </div>
  );
}

export default Schedule;
