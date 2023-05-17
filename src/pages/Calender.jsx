import React, { useState, useRef } from "react";
import { Header } from "../components";

//--------Calender Plugins ----------------
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calender = () => {
  const intialEvents = [
    { title: "event 1", date: "2023-04-01" },
    { title: "event 2", date: "2023-04-02" },
    { title: "event 3", date: "2023-04-03" },
  ];

  const calendarRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState(intialEvents);
  const [eventDateTime, setEventDateTime] = useState({
    name: "",
    date: "",
    time: "",
  });

  const handleModalClose = () => {
    setShowModal(false);
    setEventDateTime({ name: "", date: "", time: "" });
  };

  const handleAddEvent = (selected) => {
    const event = {
      title: eventDateTime.name,
      start: eventDateTime.date + "T" + eventDateTime.time,
      backgroundColor: "green", // Set the desired background color
    };
    const api = calendarRef.current.getApi();
    api.addEvent(event);
    setEvents([...events, event]);
    handleModalClose();
  };

  const handleShowModal = (selected) => {
    setShowModal(true);
  };

  const handleEventDelete = (selected) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the event '${selected.event.title}'`
    );
    if (confirmDelete) selected.event.remove();
  };

  const handleOnChange = (e) => {
    setEventDateTime({ ...eventDateTime, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-5">
      <Header category="App" title="Calendar" />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Select Date and Time
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <h1>Event Name : </h1>
                  <input
                    type="text"
                    className="border-solid border border-indigo-600 text-black"
                    onChange={handleOnChange}
                    name="name"
                    value={eventDateTime.name}
                  />
                  <div className="mt-3">
                    <span>Date : </span>
                    <input
                      type="date"
                      name="date"
                      value={eventDateTime.date}
                      onChange={handleOnChange}
                      className=""
                    />
                  </div>
                  <div className="mt-3">
                    <span>Time : </span>
                    <input
                      type="time"
                      name="time"
                      value={eventDateTime.time}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddEvent}
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        height={"650px"}
        eventClick={handleEventDelete} //--- To delete events
        events={events} //---- Initial Events
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          right: "AddEventsButton dayGridMonth,timeGridWeek,timeGridDay",
        }}
        //-----For Adding Custom Buttons -----------
        customButtons={{
          AddEventsButton: {
            text: "Add Event",
            click: handleShowModal,
          },
        }}
      />
    </div>
  );
};

export default Calender;
