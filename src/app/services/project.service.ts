import { Injectable } from "@angular/core";
import { Project } from "../models/project.model";

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly STORAGE_KEY = 'livecanvas-projects';

  private load(): Project[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  private save(projects: Project[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
  }

  getAll(): Project[] {
    return this.load().sort((a, b) => b.updatedAt - a.updatedAt);
  }

  get(id: string): Project | undefined {
    return this.load().find(p => p.id === id);
  }

  create(name: string): Project {
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      html: '',
      css: '',
      js: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const projects = this.load();
    projects.push(project);
    this.save(projects);
    return project;
  }

  update(project: Project): void {
    const projects = this.load();
    const index = projects.findIndex(p => p.id === project.id);
    if (index > -1) {
      projects[index] = { ...project, updatedAt: Date.now() };
      this.save(projects);
    }
  }

  delete(id: string): void {
    const projects = this.load().filter(p => p.id !== id);
    this.save(projects);
  }
}