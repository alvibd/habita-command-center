I want to make some changes, for my personalized native ai sdlc playbook. 
First I want to create a skill (AI-native-sdlc-customized-planning) for this habita product in the /mnt/d/habita/.claude/skills directory for planning, during planning ask me which of the following stage of sdlc is the plan for?
BRD Generation: suitable when I do not have a clear idea what to do and how to do it, it will involve generating either low fidelity wireframe as detailed as possible and when generating the wireframes covering all kinds off interactions and triggers that will be visible to the user.

Build: The plan I have in mind does not involve design change but might rather be something like an optimization, security or integration related tasks. It may only require the backend or the frontend repositories, in which case claude will only read from the directory where the code resides, or it may involve both repositories in such as claude is free to read whichever of the repository files are required.

if BRD generation stage is selected in plan mode this skill should run subagent to make the lo-fi prototype/wireframe in figma and update figma when change is requested. no need to draw any UML diagrams in the plan. make sure every interaction screens are generated and their relations are drawn using best figma features to make it as interactive as possible in figma.

I need you to update the BRD genration skill so it is triggered when the Plan for BRD generation is approved. do not create local files for prototypes. make sure UMLs match the understanding of the figma design.

Add the superpowers:writing-plans skill directly in the backend and frontend repository's claude skills. modify the skill so that every file/document it needs to generate instead of creating them locally it will create github issues in respective repositories with labels suited or is deterministically mentioned directory name in the current skill.

if build stage is selected for the AI-sdlc planning skill, and prompt for plan indicates it would require both backend and frontend repo change, two sub agents will run triggering the customized local superpowers:writing-plans skill for the repos. 

AI agents might writes things for which my context might not be clear during build stage planning, so for such ocassion create directory maintaining session ID and write an explanation.md file. Where you will write clarifications. and a Glossary.md file where the you will explain any technical terms that I might not be familiar with. And when the plan is approved and it requires design change or add make sure relavant figma designs are mentioned in the github issue.

For me brd generation is PLAN stage of AI native SDLC.

my goal is to become a one man software company using AI and making it progressively more and more deterministic as suited to my style of building and deploying softwares.