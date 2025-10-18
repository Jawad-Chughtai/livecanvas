import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { SharedModule } from '../../shared/shared/shared.module';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { ConfirmationService } from '../../shared/lib/swal/confirmation.service';
import { ToastService } from '../../shared/lib/swal/toaster.service';

@Component({
  selector: 'app-home',
  imports: [SharedModule, HeroSectionComponent, HeroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projects = this.projectService.getAll();
  }

  createProject(): void {
    this.confirmationService
      .prompt('Project Name', 'Please specify the project name', 'Untitled')
      .subscribe((name: string | null) => {
        if (!name) return;
        const project = this.projectService.create(name);
        this.router.navigate(['/editor', project.id]);
      });
  }

  deleteProject(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.confirmationService
      .delete('Are you sure you want to delete this project?', 'Delete Project')
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.projectService.delete(id);
          this.loadProjects();
          this.toastService.success('Project deleted successfully.');
        }
      });
  }

  openProject(id: string): void {
    this.router.navigate(['/editor', id]);
  }
}