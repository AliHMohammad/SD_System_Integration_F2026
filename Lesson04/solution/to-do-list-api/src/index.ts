import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Task interface
interface Task {
    id: number;
    task: string;
    done: boolean;
}

// In-memory data store
let tasks: Task[] = [
    { id: 1, task: "Learn REST APIs", done: false },
    { id: 2, task: "Build a REST API", done: false },
    { id: 3, task: "Test the API", done: false },
    { id: 4, task: "Keep learning", done: false },
];

// Helper function to generate HATEOAS links for a task
const generateTaskLinks = (taskId: number, req: Request) => {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    return {
        self: { href: `${baseUrl}/tasks/${taskId}`, method: "GET" },
        update: { href: `${baseUrl}/tasks/${taskId}`, method: "PUT" },
        delete: { href: `${baseUrl}/tasks/${taskId}`, method: "DELETE" },
        all: { href: `${baseUrl}/tasks`, method: "GET" },
    };
};

// Helper function to generate collection links with pagination
const generateCollectionLinks = (req: Request, pageNum: number, pageSize: number, totalPages: number) => {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const links: any = {
        self: {
            href: `${baseUrl}/tasks?pageNum=${pageNum}&pageSize=${pageSize}`,
            method: "GET",
        },
        create: { href: `${baseUrl}/tasks`, method: "POST" },
        first: {
            href: `${baseUrl}/tasks?pageNum=1&pageSize=${pageSize}`,
            method: "GET",
        },
        last: {
            href: `${baseUrl}/tasks?pageNum=${totalPages}&pageSize=${pageSize}`,
            method: "GET",
        },
    };

    // Add previous page link if not on first page
    if (pageNum > 1) {
        links.prev = {
            href: `${baseUrl}/tasks?pageNum=${pageNum - 1}&pageSize=${pageSize}`,
            method: "GET",
        };
    }

    // Add next page link if not on last page
    if (pageNum < totalPages) {
        links.next = {
            href: `${baseUrl}/tasks?pageNum=${pageNum + 1}&pageSize=${pageSize}`,
            method: "GET",
        };
    }

    return links;
};

// Helper function to generate simple collection links (without pagination)
const generateSimpleCollectionLinks = (req: Request) => {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    return {
        self: { href: `${baseUrl}/tasks`, method: "GET" },
        create: { href: `${baseUrl}/tasks`, method: "POST" },
    };
};

// GET /tasks - Retrieve all tasks with pagination
app.get("/tasks", (req: Request, res: Response) => {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Parse pagination parameters with defaults
    const pageNum = parseInt(req.query.pageNum as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    // Validate pagination parameters
    if (pageNum < 1) {
        return res.status(400).json({
            error: "Bad Request",
            message: "pageNum must be greater than or equal to 1",
        });
    }

    if (pageSize < 1 || pageSize > 100) {
        return res.status(400).json({
            error: "Bad Request",
            message: "pageSize must be between 1 and 100",
        });
    }

    // Calculate pagination
    const totalItems = tasks.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get paginated tasks
    const paginatedTasks = tasks.slice(startIndex, endIndex);

    const tasksWithLinks = paginatedTasks.map((task) => ({
        ...task,
        links: generateTaskLinks(task.id, req),
    }));

    res.json({
        data: {
            tasks: tasksWithLinks,
            count: tasksWithLinks.length,
        },
        metadata: {
            pagination: {
                currentPage: pageNum,
                pageSize: pageSize,
                totalItems: totalItems,
                totalPages: totalPages,
                hasNextPage: pageNum < totalPages,
                hasPreviousPage: pageNum > 1,
            },
            links: generateCollectionLinks(req, pageNum, pageSize, totalPages),
        },
    });
});

// GET /tasks/:id - Retrieve a task by ID
app.get("/tasks/:id", (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
        return res.status(404).json({
            error: "Task not found",
            message: `Task with ID ${taskId} does not exist`,
        });
    }

    res.json({
        data: task,
        metadata: {
            links: generateTaskLinks(task.id, req),
        },
    });
});

// POST /tasks - Add a new task
app.post("/tasks", (req: Request, res: Response) => {
    const { task, done } = req.body;

    if (!task) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Task description is required",
        });
    }

    const newTask: Task = {
        id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
        task: task,
        done: done !== undefined ? done : false,
    };

    tasks.push(newTask);

    res.status(201).json({
        data: newTask,
        metadata: {
            links: generateTaskLinks(newTask.id, req),
        },
    });
});

// PUT /tasks/:id - Edit a task by ID
app.put("/tasks/:id", (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found",
            message: `Task with ID ${taskId} does not exist`,
        });
    }

    const { task, done } = req.body;

    if (task !== undefined) {
        tasks[taskIndex].task = task;
    }
    if (done !== undefined) {
        tasks[taskIndex].done = done;
    }

    res.json({
        data: tasks[taskIndex],
        metadata: {
            links: generateTaskLinks(tasks[taskIndex].id, req),
        },
    });
});

// DELETE /tasks/:id - Delete a task by ID
app.delete("/tasks/:id", (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found",
            message: `Task with ID ${taskId} does not exist`,
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json({
        data: {
            message: "Task successfully deleted",
            task: deletedTask,
        },
        metadata: {
            links: generateSimpleCollectionLinks(req),
        },
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`To-Do List API is running on http://localhost:${PORT}`);
    console.log(`Available endpoints:`);
    console.log(`  GET    /tasks       - Retrieve all tasks`);
    console.log(`  GET    /tasks/:id   - Retrieve a task by ID`);
    console.log(`  POST   /tasks       - Create a new task`);
    console.log(`  PUT    /tasks/:id   - Update a task by ID`);
    console.log(`  DELETE /tasks/:id   - Delete a task by ID`);
});
