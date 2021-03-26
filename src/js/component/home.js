import React, { useState, useEffect } from "react";

import { useReducer } from "react/cjs/react.production.min";

export function Home() {
	const [list, setlist] = useState([]); //para configurar los elementos de la lista.
	const [toDo, settoDo] = useState(""); // para configurar el input.

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alonsog3a", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log("respuesta", resp);

				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/alonsog3a",
					{
						method: "GET",

						headers: {
							"Content-Type": "application/json"
						}
					}
				)
					.then(resp => {
						console.log("respuesta", resp);
						return resp.json();
					})
					.then(data => {
						setlist(data);
					})

					.catch(err => {
						console.log("error", err);
					});
			})

			.catch(err => {
				console.log("error", err);
			});
	}, []);
	const addToList = tarea => {
		//
		setlist([...list, { label: tarea, done: false }]); //las tareas se configuran respecto al objeto.

		// confuguro setlist para agregar listas al array
		settoDo(""); //al indicar el settodo aca nos hace que cada vez que se incluya un lista vuelva al valor inicial
	};

	const delTarea = pos => {
		const tempList = [...list];
		console.log("previo borrado", tempList);
		tempList.splice(pos, 1);
		console.log("Lista temporal", tempList);
		const methods = ["PUT", "DELETE"];
		if (tempList.length > 0) {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/alonsog3a",
				{
					method: methods[0],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			)
				.then(resp => {
					console.log("Respuesta de borrado", resp);
					setlist(tempList);
					console.log(list);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		} else {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/alonsog3a",
				{
					method: methods[1],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			)
				.then(resp => {
					console.log("Respuesta de borrado", resp);
					setlist(tempList);
					console.log(list);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		}
	};

	const addtoDo = toDo => {
		settoDo(toDo);
	};

	const removeTask = i => {
		var newtask = list.filter((_, index) => index != i);
		setlist(newtask);
	};

	const validateInput = () => {
		if (toDo === "") alert("The input cannot be empty");
		else addToList(toDo);
	};
	return (
		<div>
			<div>
				<h2>To Do List</h2>
			</div>

			<div className="form-inline">
				<input
					className="form-control"
					type="text"
					placeholder="Add List"
					onChange={e => addtoDo(e.target.value)}
					value={toDo}></input>
				<button
					className="btn btn-info"
					type="submit"
					onClick={validateInput}>
					Add Task
				</button>
			</div>
			<div>
				<ul className="list-group">
					{list.map((element, i) => (
						<li
							className="list-group-item"
							key={i}
							onClick={() => removeTask(i)}>
							{element.label}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
