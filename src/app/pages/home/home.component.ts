import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { SharedModule } from '../../shared/shared/shared.module';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projects = this.projectService.getAll();
  }

  createProject(): void {
    const name = prompt('Enter project name');
    if (!name) return;
    const project = this.projectService.create(name);
    this.router.navigate(['/editor', project.id]);
  }

  deleteProject(id: string): void {
    if (confirm('Delete this project?')) {
      this.projectService.delete(id);
      this.loadProjects();
    }
  }

  openProject(id: string): void {
    this.router.navigate(['/editor', id]);
  }
}